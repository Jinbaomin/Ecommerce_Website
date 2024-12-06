package org.example.myproject.services.Impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.myproject.exception.AppException;
import org.example.myproject.services.EmailService;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class EmailServiceImpl implements EmailService {

    JavaMailSender javaMailSender;

    SpringTemplateEngine templateEngine;

    @Override
    public void sendEmailSync(String to, String subject, String content, boolean isMultiPart, boolean isHTML) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultiPart, StandardCharsets.UTF_8.name());
            message.setTo(to);
            message.setSubject(subject);
            message.setText(content, isHTML);
            javaMailSender.send(mimeMessage);
        } catch (MailException | MessagingException e) {
//            throw new IdInvalidException(e.getMessage());
            System.out.println(e.getMessage());
        }
    }

    @Override
    public void sendTemplateEmail(String to, String subject, String templateName, String otp) {
        Context context = new Context();
        context.setVariable("email", to);
        context.setVariable("otp", otp);
        String content = templateEngine.process(templateName, context);
        this.sendEmailSync(to, subject, content, false, true);
    }


}
