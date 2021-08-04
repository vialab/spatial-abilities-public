import * as Bowser from "bowser";

export class BrowserDetails
{
	IsMobile()
	{
		const browser = Bowser.getParser(window.navigator.userAgent);
		return browser.getPlatform().type != "desktop";
	}
}