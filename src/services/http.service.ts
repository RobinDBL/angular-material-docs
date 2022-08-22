import { Component } from './../models/Component';
import * as http from 'axios';
import { JSDOM } from 'jsdom';

export class HttpService {

constructor(private axios = http.default) { }

public async getComponents() {
    // Fetch the angular-material component lists from their github page
	let res = await this.axios.get("https://github.com/angular/components/tree/main/src/material");
	// Get the html code
    let html = res.data;

    // Parse the html code
	let dom = new JSDOM(html);
    // Get all component "folders" from the html code
	let elements: Element[] = Array.from(
		dom.window.document.getElementsByClassName('js-navigation-open Link--primary'),
		  );
    
    elements.forEach(element => {
        let component: Component = {
            name: element.innerHTML,
            url: element.getAttribute("href"),
        }
    });
}

}
