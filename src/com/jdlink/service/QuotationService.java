package com.jdlink.service;

import com.jdlink.domain.Quotation;

import java.util.List;

/**
 * Created by matt on 2018/7/3.
 */
public interface QuotationService {
    void add(Quotation quotation);

    void update(Quotation quotation);

    void levelUp(Quotation quotation);

    List<Quotation> list();

    int count();

    Quotation getById(String id);

    Quotation getByQuotationId(String quotationId);

    void setStateDisabled(String id);

    void changeEndDate(Quotation quotation);
}
