import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { RTCView, mediaDevices, RTCPeerConnection, MediaStream } from "react-native-webrtc";
import { useLocalSearchParams } from "expo-router";
import { Phone, Video, MessageSquare } from "lucide-react-native";


export default function VideoCall() {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.videoCallContainer}>
                {/* Doctor Video */}
                <View style={styles.doctorVideo}>
                    <Text style={styles.videoLabel}>Dr. Priya Sharma</Text>
                    <Text style={styles.videoSubLabel}>General Medicine</Text>
                </View>

                {/* Patient Video (small) */}
                <View style={styles.patientVideo}>
                    <Text style={styles.patientVideoLabel}>You</Text>
                </View>

                {/* Call Controls */}
                <View style={styles.callControls}>
                    <TouchableOpacity style={[styles.controlButton, styles.muteButton]}>
                        <Phone size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.controlButton, styles.videoToggleButton]}>
                        <Video size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.controlButton, styles.chatToggleButton]}>
                        <MessageSquare size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.controlButton, styles.endCallButton]}
                    // onPress={() => setActiveCall(false)}
                    >
                        <Phone size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* Network Status */}
                <View style={styles.networkStatus}>
                    <Text style={styles.networkText}>Connection: Good</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    scrollContent: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 12,
        color: '#1F2937',
    },
    doctorsList: {
        gap: 16,
    },
    doctorCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    doctorInfo: {
        marginBottom: 16,
    },
    doctorHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    doctorName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        flex: 1,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: '600',
        color: '#F59E0B',
    },
    specialty: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 4,
    },
    experience: {
        fontSize: 14,
        color: '#9CA3AF',
        marginBottom: 8,
    },
    languageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    languages: {
        marginLeft: 8,
        fontSize: 14,
        color: '#6B7280',
    },
    availabilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nextSlot: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '600',
    },
    callButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    callButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
    },
    callButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        marginLeft: 8,
    },
    videoButton: {
        backgroundColor: '#22C55E',
    },
    audioButton: {
        backgroundColor: '#3B82F6',
    },
    chatButton: {
        backgroundColor: '#22C55E',
    },
    bookButton: {
        backgroundColor: '#F97316',
    },
    // Video Call Styles
    videoCallContainer: {
        flex: 1,
        backgroundColor: '#000000',
    },
    doctorVideo: {
        flex: 1,
        backgroundColor: '#1F2937',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoLabel: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    videoSubLabel: {
        color: '#9CA3AF',
        fontSize: 16,
        marginTop: 8,
    },
    patientVideo: {
        position: 'absolute',
        top: 60,
        right: 20,
        width: 120,
        height: 160,
        backgroundColor: '#374151',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    patientVideoLabel: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    callControls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 20,
    },
    controlButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    muteButton: {
        backgroundColor: '#6B7280',
    },
    videoToggleButton: {
        backgroundColor: '#3B82F6',
    },
    chatToggleButton: {
        backgroundColor: '#8B5CF6',
    },
    endCallButton: {
        backgroundColor: '#EF4444',
    },
    networkStatus: {
        position: 'absolute',
        top: 60,
        left: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    networkText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
});