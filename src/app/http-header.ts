import { HttpHeaders } from "@angular/common/http";

const http = function () {
    let permission = sessionStorage.getItem('currentPermission');
    return new HttpHeaders({ 'permission': permission, 'Content-Type': 'application/json' });
};

export { http };