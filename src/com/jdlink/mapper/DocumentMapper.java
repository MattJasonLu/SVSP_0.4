package com.jdlink.mapper;

import com.jdlink.domain.Document;

import java.util.List;

/**
 * Created by matt on 2018/4/23.
 */
public interface DocumentMapper {

    List<Document> listByClientId(String clientId);

    List<Document> listContractByClientId(String clientId);

    List<Document> listManagePlanByClientId(String clientId);

    List<Document> listEIAByClientId(String clientId);

    List<Document> listBusinessLicenseByClientId(String clientId);

    List<Document> listInstructionByClientId(String clientId);

    List<Document> listInvoiceInfoByClientId(String clientId);

    List<Document> listMSDSByClientId(String clientId);

    Document getFileById(String fileId);

    void add(Document document);

}
