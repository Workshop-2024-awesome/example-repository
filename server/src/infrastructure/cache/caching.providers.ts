import { Provider } from "@nestjs/common";
import { ITokenStore } from "../../core/auth/ports/tokenstore.port";
import { TokenStore } from "./tokenstore.adapter";

export const cachingProviders : Provider[] = [
    {
        provide: ITokenStore,
        useClass: TokenStore
    }
];