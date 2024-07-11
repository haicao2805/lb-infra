import { IdType } from '../common/types';
import { MixinTarget } from '@loopback/core';
import { Entity } from '@loopback/repository';
export declare const PrincipalMixin: <E extends MixinTarget<Entity>>(superClass: E, defaultPrincipalType: string, principalIdType: "number" | "string") => {
    new (...args: any[]): {
        principalType?: string;
        principalId?: IdType;
        getId: () => any;
        getIdObject: () => Object;
        toJSON: () => Object;
        toObject: (options?: import("@loopback/repository").Options) => Object;
    };
} & E;
