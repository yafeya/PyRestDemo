import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Services from '../../services/index';
import * as Models from '../../models/index';

@Component({
    selector: 'item-list',
    templateUrl: 'itemlist.component.html',
    styleUrls: ['itemlist.component.scss']
})
export class ItemListComponent implements OnInit {

    private mUsers: any[] = [];
    private mSelectedUser: Models.User = new Models.User();
    private mSelectedRow: number;

    constructor(private httpClient: Services.HttpClient) {

    }

    ngOnInit(): void {
    }

    get Users(): any[] {
        return this.mUsers;
    }

    get SelectedUser(): Models.User {
        return this.mSelectedUser;
    }

    get SelectedRow(): number {
        return this.mSelectedRow;
    }

    async GetUsers() {
        this.mUsers = [];
        this.httpClient.UseHeader();
        let data = await this.httpClient.Get('http://localhost:9981/users');
        for (let item in data) {
            let raw = data[item];
            let rawdata = JSON.parse(raw)
            let user = new Models.User();
            user.Username = rawdata.username;
            user.Password = rawdata.password;
            user.Email = rawdata.email;
            this.mUsers.push(user);
        }
    }

    async UpdateSelected() {
        let raw = {username: this.mSelectedUser.Username, password: this.mSelectedUser.Password, email: this.mSelectedUser.Email};
        await this.httpClient.Post('http://localhost:9981/users', raw);
    }

    async DeleteSelected() {
        await this.httpClient.Delete(`http://localhost:9981/user/${this.mSelectedUser.Username}`);
    }

    OnSelect(user: Models.User, row: number): void {
        this.mSelectedUser.Username = user.Username;
        this.mSelectedUser.Password = user.Password;
        this.mSelectedUser.Email = user.Email;
        this.mSelectedRow = row;
    }
}
