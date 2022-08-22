import { Component } from './../models/Component';
import * as http from 'axios';
import { JSDOM } from 'jsdom';

export class HttpService {

constructor(private axios = http.default) { }

public async getComponents(): Promise<Component[]> {
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
    
    // Create a list with component objects
    let components: Component[] = [];
    
    elements.forEach(element => {
        let component: Component = {
            name: element.innerHTML,
            url: "https://material.angular.io/components/" + element.innerHTML + "/overview",
            githubUrl: "https://raw.githubusercontent.",
        };

        if (!component.name.includes("legacy")){
            if(!component.name.includes(".")) {
                components.push(component);
            }
        }

    });

    return components;

    // remove unwanted components such as legacy and files
}

}
