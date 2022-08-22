<script lang="js">
    import * as http from 'axios';
    import { JSDOM } from 'jsdom';

    const axios = http.default;

    let text = "";

    components = getComponents();
    console.log(componens);

    async function getComponents () {

    
        // Fetch the angular-material component lists from their github page
	let res = await axios.get("https://github.com/angular/components/tree/main/src/material");
	// Get the html code
    let html = res.data;

    // Parse the html code
	let dom = new JSDOM(html);
    // Get all component "folders" from the html code
	let elements = Array.from(
		dom.window.document.getElementsByClassName('js-navigation-open Link--primary'),
		  );
    
    // Create a list with component objects
    let components = [];
    
    elements.forEach(element => {
        let component = {
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

</script>
<style>

    </style>

<form>
    <input bind:value={text} />
</form>
    

<ul >
    {#each components as component}
    <li>
        {component.name}
    </li>
        
    {/each}
</ul>