import { HttpService } from './services/http.service';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Component } from './models/Component';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	const httpService: HttpService = new HttpService();
	let components = await (await httpService.getComponents()).map(
		component => {
			return {
				label: component.name,
				url: component.url,
				githuburl: component.githubUrl,
			};
		}
	);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('angular-material-docs.search-angular-material-docs', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const component = await vscode.window.showQuickPick(components, {
			matchOnDetail: true
		});

		console.log(component);
		if (component == null){
			return;
		}

		const uri = vscode.Uri.parse(component.url!);
		vscode.env.openExternal(uri);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
