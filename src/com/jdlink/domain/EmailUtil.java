package com.jdlink.domain;

import com.mysql.jdbc.interceptors.SessionAssociationInterceptor;

import java.io.IOException;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


/**
 * 邮件提醒工具类
 */
public class EmailUtil {

    /**
     * 发送邮件
     * @param email  收件人邮箱
     * @param text  邮件内容
     * @throws MessagingException
     */
    public static void sendEmail(String email, String text) throws MessagingException {
        String subject = "ERP系统消息";     // 邮件主题
        // 创建一个程序与邮件服务器会话对象session
        Properties properties = new Properties();
        // 设置访问smtp服务器需要认证
        properties.setProperty("mail.smtp.auth", "true");
        // 设置访问服务器的协议
        properties.setProperty("mail.transport.protocol", "smtp");
        // 创建邮件服务器会话对象session
        Session session = Session.getDefaultInstance(properties);
        // 创建一个message,相当于邮件内容
        Message msg = new MimeMessage(session);
        // 设置发送者
        msg.setFrom(new InternetAddress("wuhanxue5@163.com"));
        // 设置邮件主题
        msg.setSubject(subject);
        // 设置邮件内容
        msg.setText(text);
        Transport transport = session.getTransport();
        // 连接邮箱smtp服务器，25为默认端口，163邮箱；客户端授权密码（不是登录密码，具体怎么获取百度163客户端授权密码）
        transport.connect("smtp.163.com",25,"wuhanxue5@163.com","WHX123456789");
        if(email == null) {  // 如果没有接受者则发送给自己
            email = "wuhanxue5@163.com";
        }
        // 发送邮件
        transport.sendMessage(msg, new Address[]{new InternetAddress(email)});
        transport.close();    // 关闭连接
    }


    public static void main(String[] args) throws MessagingException{
        String orderId = "2018010210001";   // 单据号
        String receiverEmail = "wuhanxue5@sina.com";   // 收件人邮箱
        String receiverName = "张大强";           // 收件人姓名

        String siginAdress = "222.191.244.156:9998/SVSP/admin.html\n(内网：http://172.16.1.92:9998/SVSP/admin.html)";   // 登录地址
        String text = "Dear " + receiverName + ":\n    您有一个新的单据" + orderId + "待审批，请登陆系统查看：\n" + siginAdress;   // 邮件正文
        sendEmail(receiverEmail,text);     // 发送邮件
    }
}
