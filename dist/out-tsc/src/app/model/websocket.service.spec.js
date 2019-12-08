import { TestBed } from '@angular/core/testing';
import { WebsocketService } from './websocket.service';
describe('WebsocketService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(WebsocketService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=websocket.service.spec.js.map