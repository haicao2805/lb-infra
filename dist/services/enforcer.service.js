"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var EnforcerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnforcerService = void 0;
const casbin_1 = require("casbin");
const fs_1 = __importDefault(require("fs"));
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const base_service_1 = require("../base/base.service");
const core_1 = require("@loopback/core");
const authorize_component_1 = require("../components/authorize.component");
const utilities_1 = require("../utilities");
const casbin_pg_adapter_1 = __importDefault(require("casbin-pg-adapter"));
let EnforcerService = EnforcerService_1 = class EnforcerService extends base_service_1.BaseService {
    constructor(confPath, adapterConnectionString) {
        super({ scope: EnforcerService_1.name });
        this.confPath = confPath;
        this.adapterConnectionString = adapterConnectionString;
    }
    getEnforcer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.enforcer) {
                return this.enforcer;
            }
            if (!this.confPath || (0, isEmpty_1.default)(this.confPath)) {
                throw (0, utilities_1.getError)({
                    statusCode: 500,
                    message: '[getEnforcer] Invalid enforcer configuration path!',
                });
            }
            if (!fs_1.default.existsSync(this.confPath)) {
                throw (0, utilities_1.getError)({
                    statusCode: 500,
                    message: '[getEnforcer] Enforcer configuration path is not existed!',
                });
            }
            this.adapter = yield casbin_pg_adapter_1.default.newAdapter({
                connectionString: this.adapterConnectionString,
                migrate: true,
            });
            this.enforcer = yield (0, casbin_1.newCachedEnforcer)(this.confPath, this.adapter);
            yield this.enforcer.loadPolicy();
            return this.enforcer;
        });
    }
};
EnforcerService = EnforcerService_1 = __decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.SINGLETON }),
    __param(0, (0, core_1.inject)(authorize_component_1.AuthorizeComponentKeys.AUTHORIZER.CONFIGURE_PATH)),
    __param(1, (0, core_1.inject)(authorize_component_1.AuthorizeComponentKeys.AUTHORIZER.ADAPTER_CONNECTION_STRING)),
    __metadata("design:paramtypes", [String, String])
], EnforcerService);
exports.EnforcerService = EnforcerService;
//# sourceMappingURL=enforcer.service.js.map