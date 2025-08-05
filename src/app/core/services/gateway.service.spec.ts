import { GatewayService } from './gateway.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

describe('GatewayService', () => {
    let service: GatewayService<void>;
    let httpMock: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpMock = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);

        TestBed.configureTestingModule({
            providers: [GatewayService, { provide: HttpClient, useValue: httpMock }],
        });

        service = TestBed.inject(GatewayService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should send get http request', (done) => {
        httpMock.get.and.returnValue(of('get'));
        service.get('test').subscribe((value) => {
            expect(value).toEqual('get');
            done();
        });
    });

    it('should send post http request', (done) => {
        const payload = { id: '1', name: 'post' };
        httpMock.post.and.returnValue(of(payload));
        service.post('post', payload).subscribe((value) => {
            expect(value).toEqual(payload);
            done();
        });
    });

    it('should send put http request', (done) => {
        const payload = { id: '1', name: 'put' };
        httpMock.put.and.returnValue(of(payload));
        service.put('put', payload).subscribe((value) => {
            expect(value).toEqual(payload);
            done();
        });
    });
    it('should send patch http request', (done) => {
        const payload = { id: '1', name: 'patch' };
        httpMock.patch.and.returnValue(of(payload));
        service.patch('patch', payload).subscribe((value) => {
            expect(value).toEqual(payload);
            done();
        });
    });

    it('deletes http request without params', (done) => {
        const payload = { id: '1', name: 'delete' };
        httpMock.delete.and.returnValue(of(payload));
        service.delete('delete').subscribe((value) => {
            expect(value).toEqual(payload);
            done();
        });
        expect(httpMock.delete).toHaveBeenCalledOnceWith('delete');
    });

    it('should send delete http request with params', (done) => {
        const httpParams = new HttpParams();
        const payload = { id: '1', name: 'delete' };
        httpMock.delete.and.returnValue(of(payload));
        service.delete('delete', httpParams).subscribe((value) => {
            expect(value).toEqual(payload);
            done();
        });
        expect(httpMock.delete).toHaveBeenCalledOnceWith('delete', {
            params: httpParams,
        });
    });
});
