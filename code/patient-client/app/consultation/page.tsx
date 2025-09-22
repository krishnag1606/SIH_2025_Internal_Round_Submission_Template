"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function ConsultationPage() {

    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    const [socket, setSocket] = useState<any>(null);
    const [pc, setPc] = useState<RTCPeerConnection | null>(null);
    const [roomId] = useState("room-123");

    const [stream, setStream] = useState<MediaStream | null>(null);
    const [micOn, setMicOn] = useState(true);
    const [camOn, setCamOn] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const s = io("http://localhost:4000");
        setSocket(s);

        const peer = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });
        setPc(peer);

        peer.ontrack = (event) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        peer.onicecandidate = (event) => {
            if (event.candidate) {
                s.emit("ice-candidate", { roomId, candidate: event.candidate });
            }
        };

        s.emit("join-room", { roomId });

        s.on("offer", async ({ sdp }) => {
            await peer.setRemoteDescription(sdp);
            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);
            s.emit("answer", { roomId, sdp: answer });
        });

        s.on("answer", async ({ sdp }) => {
            await peer.setRemoteDescription(sdp);
        });

        s.on("ice-candidate", async ({ candidate }) => {
            try {
                await peer.addIceCandidate(candidate);
            } catch (err) {
                console.error("Error adding ice candidate", err);
            }
        });

        s.on("end", () => {
            endCall();
        })

        return () => {
            s.disconnect();
            peer.close();
        }

    }, [roomId]);

    const startCall = async () => {
        if (!pc || !socket) return;
        const userStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });

        setStream(userStream);

        if (localVideoRef.current) {
            localVideoRef.current.srcObject = userStream;
        }

        // Add tracks to peer connection
        userStream.getTracks().forEach((track) => pc.addTrack(track, userStream));

        // Caller creates offer
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("offer", { roomId, sdp: offer });
    };

    const toggleMic = () => {
        console.log(stream)
        if (!stream) return;
        stream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled))
        setMicOn((prev) => !prev);
    }

    const toggleCam = () => {
        if (!stream) return;
        stream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled))
        setCamOn((prev) => !prev);
    }

    const endCall = () => {
        stream?.getTracks().forEach(track => track.stop());
        setStream(null);

        if (socket?.connected) socket.emit("end", { roomId });

        pc?.close();
        socket?.disconnect();

        router.push("/home");
    };


    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-900 relative">
            {/* Remote (Doctor) video */}
            <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
            />

            {/* Local (Patient) video overlay */}
            <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="absolute bottom-24 right-6 w-40 h-32 object-cover rounded-lg border-2 border-white shadow-lg"
            />

            {/* Controls */}
            <div className="absolute bottom-6 flex gap-10">
                <button
                    onClick={toggleMic}
                    className={`px-4 py-2 rounded ${micOn ? "bg-green-500" : "bg-red-500"} text-white`}
                >
                    {micOn ? "Mic On" : "Mic Off"}
                </button>
                <button
                    onClick={toggleCam}
                    className={`px-4 py-2 rounded ${camOn ? "bg-green-500" : "bg-red-500"} text-white`}
                >
                    {camOn ? "Cam On" : "Cam Off"}
                </button>
                <button
                    onClick={endCall}
                    className="px-4 py-2 rounded bg-red-700 text-white"
                >
                    End Call
                </button>
            </div>

            {/* Start call button if stream not started */}
            {!stream && (
                <button
                    onClick={startCall}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Start Call
                </button>
            )}
        </div>
    );
}