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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PantheonController = void 0;
const common_1 = require("@nestjs/common");
const Pantheon_service_1 = require("./Pantheon.service");
let PantheonController = class PantheonController {
    constructor(personneService) {
        this.personneService = personneService;
    }
    createPersonne(personne) {
        this.personneService.addPersonne(personne);
        return personne;
    }
    deletePersonne(isbn) {
        this.personneService.remove(isbn);
    }
};
exports.PantheonController = PantheonController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], PantheonController.prototype, "createPersonne", null);
__decorate([
    (0, common_1.Delete)(':isbn'),
    __param(0, (0, common_1.Param)('isbn')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PantheonController.prototype, "deletePersonne", null);
exports.PantheonController = PantheonController = __decorate([
    (0, common_1.Controller)('/personnes'),
    __metadata("design:paramtypes", [Pantheon_service_1.PantheonService])
], PantheonController);
//# sourceMappingURL=Pantheon.controller.js.map