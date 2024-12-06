package org.example.myproject.services;

public interface EmailService {
    public void sendEmailSync(String to, String subject, String content, boolean isMultiPart, boolean isHTML);

    public void sendTemplateEmail(String to, String subject, String templateName, String otp);
}
