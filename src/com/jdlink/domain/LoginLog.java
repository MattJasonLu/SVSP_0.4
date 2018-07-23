package com.jdlink.domain;

import java.util.Date;

/**
 * Created by matt on 2018/7/22.
 * 登录日志
 */
public class LoginLog {
    /**
     * 编号
     */
    private int id;
    /**
     * 用户编号
     */
    private int userId;
    /**
     * 用户名
     */
    private String username;
    /**
     * 时间
     */
    private Date time;
    /**
     * ip
     */
    private String ip;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Override
    public String toString() {
        return "LoginLog{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", time=" + time +
                ", ip='" + ip + '\'' +
                '}';
    }
}
