package com.jdlink.service.impl;

import com.jdlink.domain.Document;
import com.jdlink.mapper.DocumentMapper;
import com.jdlink.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/7/8.
 */
@Service
public class DocumentServiceImpl implements DocumentService {

    @Autowired
    DocumentMapper documentMapper;

    @Override
    public List<Document> listByClientId(String clientId) {
        return documentMapper.listByClientId(clientId);
    }

    @Override
    public List<Document> listContractByClientId(String clientId) {
        return documentMapper.listContractByClientId(clientId);
    }

    @Override
    public List<Document> listManagePlanByClientId(String clientId) {
        return documentMapper.listManagePlanByClientId(clientId);
    }

    @Override
    public List<Document> listEIAByClientId(String clientId) {
        return documentMapper.listEIAByClientId(clientId);
    }

    @Override
    public List<Document> listBusinessLicenseByClientId(String clientId) {
        return documentMapper.listBusinessLicenseByClientId(clientId);
    }

    @Override
    public List<Document> listInstructionByClientId(String clientId) {
        return documentMapper.listInstructionByClientId(clientId);
    }

    @Override
    public List<Document> listInvoiceInfoByClientId(String clientId) {
        return documentMapper.listInvoiceInfoByClientId(clientId);
    }

    @Override
    public List<Document> listMSDSByClientId(String clientId) {
        return documentMapper.listMSDSByClientId(clientId);
    }

    @Override
    public Document getFileById(String fileId) {
        return documentMapper.getFileById(fileId);
    }

    @Override
    public void add(Document document) {
        documentMapper.add(document);
    }

    @Override
    public int count() {
        return documentMapper.count();
    }

    @Override
    public void updateFilePath(Document document) {
        documentMapper.updateFilePath(document);
    }
}
