import { MixinTarget } from '@loopback/core';
import { Entity } from '@loopback/repository';
export declare const SoftDeleteModelMixin: <E extends MixinTarget<Entity>>(superClass: E) => {
    new (...args: any[]): {
        isDeleted?: boolean;
        getId: () => any;
        getIdObject: () => Object;
        toJSON: () => Object;
        toObject: (options?: import("@loopback/repository").Options) => Object;
    };
} & E;
