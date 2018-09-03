package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Quotation;
import com.jdlink.domain.QuotationItem;

import java.util.List;

/**
 * Created by matt on 2018/7/3.
 */
public interface QuotationService {
    void add(Quotation quotation);

    void update(Quotation quotation);

    void levelUp(Quotation quotation);

    List<Quotation> list();

    List<Quotation> listPage(Page page);

    List<Quotation> list(String state);

    List<Quotation> listNotInvalid();

    List<Quotation> getByKeyword(String keyword);

    int count();

    Quotation getById(String id);

    Quotation getByQuotationId(String quotationId);

    void setStateDisabled(String id);

    void changeEndDate(Quotation quotation);

    void reject(String advice,String id);

    void approval(String advice,String id);
    List<Quotation> searchQuotation(Quotation quotation);

    /**
     * 通过危废编码和客户编号来获取报价单条目
     * @param wastesCode 危废编码
     * @param clientId 客户编号
     * @return 报价单条目
     */
    QuotationItem getQuotationByWastesCodeAndClientId(String wastesCode, String clientId);


}
