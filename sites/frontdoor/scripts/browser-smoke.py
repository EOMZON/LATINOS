import argparse
import json
import os

from playwright.sync_api import sync_playwright


def assert_true(condition, message):
    if not condition:
        raise AssertionError(message)


def assert_no_horizontal_overflow(page, label):
    overflow = page.evaluate(
        """() => ({
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth
        })"""
    )
    assert_true(
        overflow["scrollWidth"] <= overflow["innerWidth"] + 1,
        f"{label} has horizontal overflow: {overflow}",
    )
    return overflow


def text_is_visible(page, text):
    locator = page.get_by_text(text, exact=False)
    count = locator.count()
    for index in range(count):
        if locator.nth(index).is_visible():
            return True
    return False


def class_contains(page, selector, token):
    value = page.locator(selector).get_attribute("class") or ""
    return token in value


def text_content(page, selector):
    return page.locator(selector).text_content() or ""


parser = argparse.ArgumentParser()
parser.add_argument("--base-url", default=os.environ.get("FRONTDOOR_BASE_URL", "http://localhost:3000"))
parser.add_argument("--headed", action="store_true")
args = parser.parse_args()

summary = {"baseUrl": args.base_url, "desktop": [], "mobile": []}

with sync_playwright() as playwright:
    system_chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    launch_options = {"headless": not args.headed}
    if os.path.exists(system_chrome):
        launch_options["executable_path"] = system_chrome
    browser = playwright.chromium.launch(**launch_options)

    desktop = browser.new_page(viewport={"width": 1440, "height": 960})
    desktop.goto(args.base_url, wait_until="networkidle")
    assert_true(text_is_visible(desktop, "FORCE"), "Home page missing FORCE hero marker")
    assert_true(text_is_visible(desktop, "发力实验室"), "Home page missing Force Lab entry")
    assert_true(text_is_visible(desktop, "刚做完的一轮"), "Home page missing next-session rail")
    summary["desktop"].append("home hero visible")

    desktop.goto(f"{args.base_url}/force", wait_until="networkidle")
    assert_true(desktop.locator(".force-topic").count() == 5, "Force Lab does not render five topics")
    assert_true(text_is_visible(desktop, "力量经过哪里"), "Force Lab missing force chain guidance")
    assert_true(text_is_visible(desktop, "常见代偿"), "Force Lab missing compensation guidance")
    assert_true(text_is_visible(desktop, "待专业复核"), "Force Lab missing review status")
    assert_true(text_is_visible(desktop, "不是私有课堂原文"), "Force Lab missing public/private boundary")
    desktop.locator('a[href="#samba-floor-force"]').click()
    desktop.wait_for_timeout(200)
    assert_true("#samba-floor-force" in desktop.url, f"Force topic anchor did not update URL: {desktop.url}")
    assert_no_horizontal_overflow(desktop, "desktop force")
    summary["desktop"].append("force-first slice renders with five drills and boundaries")

    desktop.goto(f"{args.base_url}/dance-os", wait_until="networkidle")
    assert_true(text_is_visible(desktop, "Dance OS Demo"), "Dance OS page missing detail panel title")
    summary["desktop"].append("dance-os route renders")

    assert_true(text_is_visible(desktop, "Correction Ledger Demo"), "Dance OS missing correction ledger demo")
    desktop.locator('[data-testid="dance-state-beat"]').click()
    desktop.locator('[data-testid="dance-focus-feet"]').click()
    desktop.locator('[data-testid="dance-witness-note"]').fill("下轮先把锁步收小，脚下边界做清楚。")
    assert_true(class_contains(desktop, '[data-testid="dance-focus-feet"]', "active"), "Dance OS demo did not activate feet focus")
    dance_next_step = text_content(desktop, "#correction-ledger-demo .ledger-next-step p").strip()
    assert_true(
        "拍子" in dance_next_step and "脚下" in dance_next_step,
        f"Dance OS demo did not update the next-step plan: {dance_next_step!r}",
    )
    desktop.get_by_role("button", name="保存这一轮 witness", exact=True).click()
    desktop.wait_for_timeout(250)
    assert_true(text_is_visible(desktop, "拍子总乱"), "Dance OS witness save did not persist visible history")
    assert_true(text_is_visible(desktop, "Body Map / Practice Queue"), "Dance OS missing body map practice queue section")
    assert_true("1 次 witness" in text_content(desktop, '[data-testid="bodymap-focus-feet"]'), "Dance OS body map did not aggregate feet witness")
    assert_true("伦巴 · 拍子总乱" in text_content(desktop, '[data-testid="practice-queue-item-feet"]'), "Dance OS practice queue did not render latest feet witness")
    summary["desktop"].append("dance correction ledger interaction works")

    desktop.locator('a[href="#body-map-practice-queue"]').click()
    desktop.wait_for_timeout(250)
    assert_true("#body-map-practice-queue" in desktop.url, f"Dance OS body-map anchor did not update URL: {desktop.url}")
    assert_true(
        text_is_visible(desktop, "把问题压成身体热区") or text_is_visible(desktop, "按 witness 聚合"),
        "Dance OS body-map anchor did not reach the practice queue section",
    )

    desktop.locator('a[href="#dance-sources"]').click()
    desktop.wait_for_timeout(250)
    assert_true("#dance-sources" in desktop.url, f"Dance OS anchor tab did not update URL: {desktop.url}")
    assert_true(text_is_visible(desktop, "产品成立条件"), "Dance OS source matrix is missing")
    desktop.locator('a[href="#sources"]').click()
    desktop.wait_for_timeout(250)
    assert_true("#sources" in desktop.url, f"Dance OS source asset tab did not update URL: {desktop.url}")
    assert_true(text_is_visible(desktop, "来源文档"), "Dance OS asset gallery did not switch to sources")
    assert_true(text_is_visible(desktop, "brand brief"), "Dance OS source cards did not switch to source content")
    summary["desktop"].append("dance sources anchor works")

    desktop.goto(f"{args.base_url}/legacy", wait_until="networkidle")
    assert_true(text_is_visible(desktop, "旧站已经验证过的表达"), "Legacy page missing real language asset section")
    summary["desktop"].append("legacy route renders")

    desktop.goto(f"{args.base_url}/daily-latin", wait_until="networkidle")
    assert_true(desktop.locator("#today-loop-demo").count() == 1, "Daily Latin missing loop demo section")
    assert_true(desktop.locator("#today-loop-demo h2").is_visible(), "Daily Latin loop demo title is not visible")
    initial_daily_witness = text_content(desktop, '[data-testid="daily-return-witness-text"]').strip()
    desktop.locator('[data-testid="daily-state-restart"]').click()
    desktop.locator('[data-testid="daily-dance-cha"]').click()
    desktop.locator('[data-testid="daily-task-state"]').click()
    desktop.locator('[data-testid="daily-task-round"]').click()
    desktop.locator('[data-testid="daily-task-point"]').click()
    desktop.locator('[data-testid="daily-witness-note"]').fill("下次回来先把恰恰的脚下边界做清楚，不急着加快。")
    updated_daily_witness = text_content(desktop, '[data-testid="daily-return-witness-text"]').strip()
    assert_true(
        bool(updated_daily_witness) and updated_daily_witness != initial_daily_witness,
        f"Daily loop demo did not update restart witness plan: before={initial_daily_witness!r} after={updated_daily_witness!r}",
    )
    desktop.locator('[data-testid="daily-save-witness"]').click()
    desktop.wait_for_timeout(250)
    assert_true(text_is_visible(desktop, "断练后重启"), "Daily loop witness save did not persist visible history")
    assert_true(text_is_visible(desktop, "Live Return / Clip Bridge / Archive Jump"), "Daily Latin missing return bridge section")
    assert_true("断练后重启 · 恰恰" in text_content(desktop, '[data-testid="daily-return-queue"]'), "Daily return queue missing latest witness")
    desktop.locator('a[href="#live-return-bridge"]').click()
    desktop.wait_for_timeout(250)
    assert_true("#live-return-bridge" in desktop.url, f"Daily return anchor did not update URL: {desktop.url}")
    desktop.locator('[data-testid="daily-queue-bridge-latest"]').click()
    desktop.wait_for_timeout(250)
    desktop.wait_for_load_state("networkidle")
    assert_true("/dance-os" in desktop.url, f"Daily bridge did not reach Dance OS: {desktop.url}")
    assert_true(
        "state=restart" in desktop.url and "profile=cha" in desktop.url and "focus=feet" in desktop.url,
        f"Daily bridge URL missing expected params: {desktop.url}",
    )
    assert_true(class_contains(desktop, '[data-testid="dance-state-restart"]', "active"), "Daily bridge did not activate restart state")
    assert_true(class_contains(desktop, '[data-testid="dance-profile-cha"]', "active"), "Daily bridge did not activate cha profile")
    assert_true(class_contains(desktop, '[data-testid="dance-focus-feet"]', "active"), "Daily bridge did not activate feet focus")
    summary["desktop"].append("daily loop demo interaction works")

    desktop.goto(f"{args.base_url}/dashboard", wait_until="networkidle")
    assert_true(text_is_visible(desktop, "下一批交付"), "Dashboard missing next action section")
    assert_true(text_is_visible(desktop, "决策护栏"), "Dashboard missing guardrail section")
    assert_true(text_is_visible(desktop, "Proof / Risk / Gate"), "Dashboard missing proof-risk-gate section")
    assert_true(text_is_visible(desktop, "当前 proof"), "Dashboard missing proof card")
    assert_true(text_is_visible(desktop, "Route Map"), "Dashboard missing route map section")
    assert_true(text_is_visible(desktop, "Witness Archive"), "Dashboard missing witness archive section")
    assert_true(text_is_visible(desktop, "断练后重启 · 恰恰"), "Dashboard witness archive missing Daily witness evidence")
    assert_true(text_is_visible(desktop, "伦巴 · 拍子总乱"), "Dashboard witness archive missing Dance witness evidence")
    assert_true(text_is_visible(desktop, "/dance-os"), "Dashboard missing route-level map content")
    summary["desktop"].append("dashboard dense sections render")

    desktop.goto(args.base_url, wait_until="networkidle")
    assert_true(text_is_visible(desktop, "断练后重启 · 恰恰"), "Home next session queue missing Daily witness evidence")
    assert_true(text_is_visible(desktop, "伦巴 · 拍子总乱"), "Home next session queue missing Dance witness evidence")
    desktop.locator('[data-testid="queue-resume-daily"]').click()
    desktop.wait_for_timeout(250)
    desktop.wait_for_load_state("networkidle")
    assert_true("/daily-latin" in desktop.url, f"Queue resume did not reach Daily Latin: {desktop.url}")
    assert_true("state=restart" in desktop.url and "dance=cha" in desktop.url, f"Daily resume URL missing expected params: {desktop.url}")
    assert_true(class_contains(desktop, '[data-testid="daily-state-restart"]', "active"), "Daily resume did not activate restart state")
    assert_true(class_contains(desktop, '[data-testid="daily-dance-cha"]', "active"), "Daily resume did not activate cha dance")

    desktop.goto(args.base_url, wait_until="networkidle")
    desktop.locator('[data-testid="queue-resume-dance"]').click()
    desktop.wait_for_timeout(250)
    desktop.wait_for_load_state("networkidle")
    assert_true("/dance-os" in desktop.url, f"Archive resume did not reach Dance OS: {desktop.url}")
    assert_true(
        "state=beat" in desktop.url and "profile=rumba" in desktop.url and "focus=feet" in desktop.url,
        f"Dance resume URL missing expected params: {desktop.url}",
    )
    assert_true(class_contains(desktop, '[data-testid="dance-state-beat"]', "active"), "Dance resume did not activate beat state")
    assert_true(class_contains(desktop, '[data-testid="dance-profile-rumba"]', "active"), "Dance resume did not activate rumba profile")
    assert_true(class_contains(desktop, '[data-testid="dance-focus-feet"]', "active"), "Dance resume did not activate feet focus")
    summary["desktop"].append("home next session queue updates from archive")

    mobile = browser.new_page(viewport={"width": 390, "height": 844})
    mobile.goto(args.base_url, wait_until="networkidle")
    shell_state = mobile.evaluate(
        """() => ({
            mobileNav: getComputedStyle(document.querySelector('.mobile-nav-shell')).display,
            sidebar: getComputedStyle(document.querySelector('.sidebar')).display
        })"""
    )
    assert_true(shell_state["mobileNav"] != "none", f"Mobile nav hidden unexpectedly: {shell_state}")
    assert_true(shell_state["sidebar"] == "none", f"Sidebar should be hidden on mobile: {shell_state}")
    summary["mobile"].append("mobile shell switches correctly")

    home_overflow = assert_no_horizontal_overflow(mobile, "mobile home")
    summary["mobile"].append({"homeOverflow": home_overflow})

    mobile.goto(f"{args.base_url}/force", wait_until="networkidle")
    assert_true(mobile.locator(".force-topic").count() == 5, "Mobile Force Lab does not render five topics")
    assert_true(text_is_visible(mobile, "Bounce 来自地板"), "Mobile Force Lab is missing topic content")
    force_overflow = assert_no_horizontal_overflow(mobile, "mobile force")
    summary["mobile"].append({"forceOverflow": force_overflow})

    mobile.goto(args.base_url, wait_until="networkidle")

    mobile.get_by_role("button", name="展开导航", exact=True).click()
    mobile.wait_for_timeout(200)
    mobile.get_by_role("link", name="Daily Latin", exact=True).click()
    mobile.wait_for_timeout(300)
    mobile.wait_for_load_state("networkidle")
    assert_true("/daily-latin" in mobile.url, f"Mobile nav did not reach Daily Latin: {mobile.url}")
    assert_true(text_is_visible(mobile, "本页依据"), "Daily Latin missing source-backed section")
    mobile.get_by_role("tab", name="路径", exact=True).click()
    mobile.wait_for_timeout(200)
    assert_true(text_is_visible(mobile, "路径"), "Daily Latin path tab did not stay visible")
    assert_true(text_is_visible(mobile, "直播排期页"), "Daily Latin tabbed library did not switch to path items")
    daily_overflow = assert_no_horizontal_overflow(mobile, "mobile daily-latin")
    summary["mobile"].append({"dailyOverflow": daily_overflow})

    browser.close()

print(json.dumps(summary, ensure_ascii=False, indent=2))
