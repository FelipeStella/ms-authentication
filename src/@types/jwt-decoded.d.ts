import { JwtDecodeOptions } from "jwt-decode";

declare module 'jwt-decode' {

    interface JwtPayload extends JwtDecodeOptions {
        username?: string
    }
}
