package com.jdlink.domain;

import com.jdlink.mapper.UserMapper;
import com.mysql.jdbc.interceptors.SessionAssociationInterceptor;
import org.springframework.beans.factory.annotation.Autowired;

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
     * @param receiverEmail  收件人邮箱
     * @param receiverName   收件人姓名
     * @param orderId   单据号
     * @param companyEmail  发件人邮箱信息
     * @throws MessagingException
     */
    public static void sendEmail(String receiverEmail, String receiverName, String orderId,User companyEmail) throws MessagingException {
        String siginAdress = "222.191.244.156:9998/SVSP/admin.html\n(内网：http://172.16.1.92:9998/SVSP/admin.html)";   // 外网登录地址
        String text = "Dear " + receiverName + ":\n    您有一个新的单据" + orderId + "待办，请登陆系统查看：\n" + siginAdress;   // 邮件正文
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
        msg.setFrom(new InternetAddress(companyEmail.getEmail()));
        // 设置邮件主题
        msg.setSubject(subject);
        // 设置邮件内容
        msg.setText(text);
        Transport transport = session.getTransport();
        // 连接邮箱smtp服务器，25为默认端口，163邮箱；客户端授权密码（不是登录密码，具体怎么获取百度163客户端授权密码）
        transport.connect("smtp.163.com",25,companyEmail.getEmail(),companyEmail.getPassword());
        if(receiverEmail == null) {  // 如果没有接受者则发送给自己
            receiverEmail = companyEmail.getEmail();
        }
        // 发送邮件
        transport.sendMessage(msg, new Address[]{new InternetAddress(receiverEmail)});
        transport.close();    // 关闭连接
    }


    public static void main(String[] args) throws MessagingException{
        String orderId = "2018010210001";   // 单据号
        String receiverEmail = "wuhanxue5@sina.com";   // 收件人邮箱
        String receiverName = "张大强";           // 收件人姓名
        User user = new User();
        user.setPassword("CS123456789");
        user.setEmail("18915391075@163.com");
        sendEmail(receiverEmail,receiverName,orderId,user);     // 发送邮件
    }
}
