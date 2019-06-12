import { HttpHeaders } from "@angular/common/http";

const permission = localStorage.getItem('currentPermission');
const http: HttpHeaders = new HttpHeaders({ 'permission': permission, 'Content-Type': 'application/json' });

export { permission, http };