import { z } from "zod";

const registerType = z.object({
    name: z.string().min(2).max(100),
    email: z.email(),
    phone: z.string().length(10),
    password: z.string().min(6).max(100),
    age: z.string().transform((val) => parseInt(val, 10)),
    gender: z.string().transform((val) => val.toUpperCase()),
    address: z.string().min(3).max(300).optional()
});

const loginType = z.object({
    phone: z.string().length(10),
    password: z.string().min(6).max(100)
});

export { registerType, loginType };