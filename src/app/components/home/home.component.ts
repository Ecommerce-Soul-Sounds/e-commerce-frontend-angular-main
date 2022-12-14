import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    constructor(@Inject(DOCUMENT) public document: Document, private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle("Home - Soul Sounds");
    }
}