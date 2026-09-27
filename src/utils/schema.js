import { z } from "zod";

export const registerSchema = z.strictObject({
    firstName: z.string()
        .minLength(3, { message: "First name must be at least 3 characters" })
        .maxLength(15, { message: "First name cannot exceed 15 characters" })
        .regex(/^[A-Za-z]+$/, { message: "First name must contain only letters (no spaces or special characters)" }),

    lastName: z.string().optional()
        .minLength(3, { message: "Last name must be at least 3 characters" })
        .maxLength(15, { message: "Last name cannot exceed 15 characters" })
        .regex(/^[A-Za-z]+$/, { message: "Last name must contain only letters (no spaces or special characters)" }),
    
    userName: z.string()
        .minLength(3, { message: "Username must be at least 3 characters" })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
    
    password: z.string()
        .minLength(8, { message: "Password must be at least 8 characters" }),  
})

export const loginSchema = z.strictObject({    
    userName: z.string()
        .minLength(3, { message: "Username must be at least 3 characters" })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
    
    password: z.string()
        .minLength(8, { message: "Password must be at least 8 characters" }),  
})