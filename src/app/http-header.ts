import { HttpHeaders } from "@angular/common/http";

const permission = sessionStorage.getItem('currentPermission');
const http: HttpHeaders = new HttpHeaders({ 'permission': permission, 'Content-Type': 'application/json' });

export { permission, http };