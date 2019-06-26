import { nsCapabilities, createDriver, AppiumDriver } from "nativescript-dev-appium";
import { TabsViewBasePage } from "./tabs-view-base-page";
import { Platform } from "mobile-devices-controller";

const suite = "tabs";
const spec = "tabs";

describe(`${suite}-${spec}-tests-suite`, async function () {
    let driver: AppiumDriver;
    let tabsViewBasePage: TabsViewBasePage;

    before(async function () {
        nsCapabilities.testReporter.context = this;
        driver = await createDriver();
        await driver.resetApp();
        tabsViewBasePage = new TabsViewBasePage(driver);
        await tabsViewBasePage.initSuite();
    });

    after(async function () {
        await tabsViewBasePage.endSuite();
    });

    beforeEach(async function () {
        tabsViewBasePage.imageHelper.setImageName(suite, spec, this.currentTest.title);
        tabsViewBasePage.imageHelper.defualtOptions = {
            imageName: this.currentTest.title,
            tolerance: 0.01,
            timeOutSeconds: 5
        };
    });

    afterEach(async function () {
        if (this.currentTest.state === "failed") {
            await driver.logTestArtifacts(this.currentTest.title);
            await driver.resetApp();
            await tabsViewBasePage.initSuite();
        }
    });

    it(`${spec}-background-color`, async function () {
        await tabsViewBasePage.navigateToSample("background-color");

        await tabsViewBasePage.imageHelper.compareScreen();
        await tabsViewBasePage.imageHelper.assertImages();

        await tabsViewBasePage.navigateBackToSuitMainPage();
    });

    it(`${spec}-bottom-navigation`, async function () {
        await tabsViewBasePage.navigateToSample("bottom-navigation");
        await tabsViewBasePage.imageHelper.compareScreen();
        await tabsViewBasePage.imageHelper.assertImages();
        await tabsViewBasePage.navigateBackToSuitMainPage();
    });

    it(`${spec}-color`, async function () {
        await tabsViewBasePage.navigateToSample("color");
        await tabsViewBasePage.imageHelper.compareScreen();
        await tabsViewBasePage.imageHelper.assertImages();
        await tabsViewBasePage.navigateBackToSuitMainPage();
    });

    it(`${spec}-icon-change`, async function () {
        await tabsViewBasePage.navigateToSample("tab-view-icon-change");
        const index = driver.nsCapabilities.device.platform === Platform.IOS
            ? (driver.nsCapabilities.device.apiLevel >= 11 ? 2 : 3) : 1;

        let btns = await driver.findElementsByClassName(driver.locators.button, 5000);
        await btns[index].tap();
        await tabsViewBasePage.imageHelper.compareScreen();

        btns = await driver.findElementsByClassName(driver.locators.button, 5000);
        await btns[index - 1].tap();
        await tabsViewBasePage.imageHelper.compareScreen();

        await tabsViewBasePage.imageHelper.assertImages();

        await tabsViewBasePage.navigateBackToSuitMainPage();
    });

    it(`${spec}-icon-title-placment`, async function () {
        await tabsViewBasePage.navigateToSample("icon-title-placement");
        await tabsViewBasePage.imageHelper.compareScreen();
        await tabsViewBasePage.imageHelper.assertImages();
        await tabsViewBasePage.navigateBackToSuitMainPage();
    });

    it(`${spec}-issue-5470`, async function () {
        await tabsViewBasePage.navigateToSample("issue-5470");
        await tabsViewBasePage.imageHelper.compareScreen();
        await tabsViewBasePage.imageHelper.assertImages();
        await tabsViewBasePage.navigateBackToSuitMainPage();
    });

    it(`${spec}-swipe-enabled`, async function () {
        await tabsViewBasePage.navigateToSample("swipe-enabled");
        await tabsViewBasePage.imageHelper.compareScreen();
        await tabsViewBasePage.imageHelper.assertImages();
        await tabsViewBasePage.navigateBackToSuitMainPage();
    });

    it(`${spec}-tab-position`, async function () {
        await tabsViewBasePage.navigateToSample("tab-position");
        await tabsViewBasePage.imageHelper.compareScreen();
        await tabsViewBasePage.imageHelper.assertImages();
        await tabsViewBasePage.navigateBackToSuitMainPage();
    });
});