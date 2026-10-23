import { test, expect } from '@playwright/test';

// The Web3Forms request is intercepted, so these tests never send a real message.
const ENDPOINT = 'https://api.web3forms.com/submit';

test('contact form sends a well-formed request and shows the thank-you page', async ({ page }) => {
  let body: Record<string, string> | undefined;
  await page.route(ENDPOINT, async (route) => {
    body = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, message: 'Email sent successfully!' }) });
  });

  await page.goto('/contact/');
  await page.getByLabel('Name').fill('Test Person');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Phone').fill('509-555-0100');
  await page.getByLabel('Service').selectOption('Commercial Blower Door Testing');
  await page.getByLabel('Message').fill('Testing the contact form.');
  await page.getByRole('button', { name: 'Send message' }).click();

  await expect(page).toHaveURL(/\/thank-you\/$/);
  await expect(page.locator('h1')).toContainText('message was sent');

  expect(body).toBeDefined();
  expect(body!.name).toBe('Test Person');
  expect(body!.email).toBe('test@example.com');
  expect(body!.phone).toBe('509-555-0100');
  expect(body!.service).toBe('Commercial Blower Door Testing');
  expect(body!.message).toBe('Testing the contact form.');
  expect(body!.subject).toBeTruthy();
  expect(body!.botcheck, 'spam trap must stay empty').toBeUndefined();
  if (process.env.CI || process.env.FORM_ACCESS_KEY) {
    expect(body!.access_key, 'access key must be built into the page').toMatch(/^[0-9a-f-]{36}$/);
  }
});

test('contact form shows clear errors and sends nothing when required fields are empty', async ({ page }) => {
  let sent = false;
  await page.route(ENDPOINT, async (route) => {
    sent = true;
    await route.abort();
  });

  await page.goto('/contact/');
  await page.getByRole('button', { name: 'Send message' }).click();

  await expect(page.getByText('Please enter your name.')).toBeVisible();
  await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  await expect(page.getByText('Please enter a message.')).toBeVisible();
  await expect(page.getByLabel('Name')).toBeFocused();

  await page.getByLabel('Email').fill('not-an-email');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  expect(sent).toBe(false);
});

test('contact form shows a fallback message if sending fails', async ({ page }) => {
  await page.route(ENDPOINT, (route) => route.fulfill({ status: 500, body: '{}' }));
  await page.goto('/contact/');
  await page.getByLabel('Name').fill('Test Person');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Message').fill('Testing failure handling.');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByRole('status')).toContainText("didn't send");
  await expect(page).toHaveURL(/\/contact\/$/);
});
