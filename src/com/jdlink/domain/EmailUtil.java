package com.jdlink.domain;

import com.mysql.jdbc.interceptors.SessionAssociationInterceptor;

import java.io.IOException;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


/**
 * 邮件提醒实体类
 */
public class EmailUtil {

    /**
     * 发送邮件
     * @param email  收件人邮箱
     * @param subject  邮件主题
     * @param text  邮件内容
     * @throws MessagingException
     */
    public static void sendEmail(String email, String subject, String text) throws MessagingException {

        Properties properties = new Properties();
        properties.setProperty("mail.smtp.auth", "true");
        properties.setProperty("mail.transport.protocol", "smtp");
        Session session = Session.getDefaultInstance(properties);
        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress("wuhanxue5@163.com"));
        msg.setSubject(subject);
        msg.setText(text);
        Transport transport = session.getTransport();
        transport.connect("smtp.163.com",25,"wuhanxue5@163.com","WHX123456789");
        if(email == null) {
            email = "wuhanxue5@163.com";
        }
        transport.sendMessage(msg, new Address[]{new InternetAddress(email)});
        transport.close();
    }

    public static void main(String[] args) throws MessagingException{
        sendEmail("13885258557@qq.com","ERP系统消息","您有一个新的待办事项，请登陆系统查看：");
    }
}
