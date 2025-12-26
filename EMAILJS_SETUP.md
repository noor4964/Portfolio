# EmailJS Setup Guide

This guide will help you set up EmailJS to receive contact form submissions at **sk.nuralam@hotmail.com**.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In the EmailJS dashboard, click on **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Choose **"Outlook"** (since you're using hotmail.com)
4. Connect your **sk.nuralam@hotmail.com** account
5. Note down the **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create Email Template

1. Click on **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Set up the template with these fields:

   **Template Settings:**
   - Template Name: `Portfolio Contact Form`
   - To Email: `sk.nuralam@hotmail.com`
   - From Name: `{{name}}`
   - Subject: `Portfolio Contact: {{subject}}`

   **Email Body:**
   ```
   New contact form submission from your portfolio:

   Name: {{name}}
   Email: {{email}}
   Subject: {{subject}}

   Message:
   {{message}}

   ---
   This email was sent from your portfolio contact form.
   ```

4. Click **"Save"** and note down the **Template ID** (e.g., `template_xxxxxxx`)

## Step 4: Get Public Key

1. Click on **"Account"** in the left sidebar
2. Go to the **"General"** tab
3. Find your **Public Key** (e.g., `xxxxxxxxxxxxx`)

## Step 5: Configure Environment Variables

1. Open the `.env` file in your project root
2. Add your EmailJS credentials:

   ```env
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
   ```

3. Save the file

## Step 6: Restart Development Server

If your dev server is running, restart it to load the new environment variables:

```bash
npm run dev
```

## Step 7: Test the Contact Form

1. Open your portfolio in the browser
2. Navigate to the Contact section
3. Fill out the form with test data
4. Submit the form
5. Check your email at **sk.nuralam@hotmail.com**

## Troubleshooting

### Not receiving emails?
- Check your EmailJS dashboard for delivery status
- Verify your email service is properly connected
- Check spam/junk folder
- Ensure environment variables are correctly set
- Check browser console for errors

### Form not submitting?
- Check browser console for errors
- Verify all environment variables are set
- Make sure dev server was restarted after adding .env

### Rate Limits
The free EmailJS plan allows:
- 200 emails per month
- 2 emails per second

## Security Note

⚠️ **Never commit your `.env` file to Git!** The `.gitignore` file should already exclude it.

## Additional Configuration

### Auto-Reply to User
You can create a second template to send an automatic confirmation to the user who submitted the form.

### Custom Domain Email
For a more professional look, consider using a custom domain email instead of hotmail.com.

## Support

For more help, visit [EmailJS Documentation](https://www.emailjs.com/docs/)
