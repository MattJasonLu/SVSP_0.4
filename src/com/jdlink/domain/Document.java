package com.jdlink.domain;

import java.util.Date;

/**
 * Created by matt on 2018/7/8.
 */
public class Document {
    private String fileId;
    private String clientId;
    private String fileName;
    private String filePath;
    private DocumentType documentType;
    /**
     * 当前时间
     */
    private Date nowTime;

    @Override
    public String toString() {
        return "Document{" +
                "fileId='" + fileId + '\'' +
                ", clientId='" + clientId + '\'' +
                ", fileName='" + fileName + '\'' +
                ", filePath='" + filePath + '\'' +
                ", documentType=" + documentType +
                ", nowTime=" + nowTime +
                '}';
    }

    public Date getNowTime() {
        return nowTime;
    }

    public void setNowTime(Date nowTime) {
        this.nowTime = nowTime;
    }

    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

}
