package com.jdlink.service.impl;

import com.jdlink.domain.Quotation;
import com.jdlink.mapper.QuotationMapper;
import com.jdlink.service.QuotationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/7/3.
 */
@Service
public class QuotationServiceImpl implements QuotationService {
    @Autowired
    QuotationMapper quotationMapper;


    @Override
    public void add(Quotation quotation) {
        quotationMapper.add(quotation);
    }

    @Override
    public void update(Quotation quotation) {
        quotationMapper.update(quotation);
    }

    @Override
    public List<Quotation> list() {
        return quotationMapper.list();
    }

    @Override
    public int count() {
        return quotationMapper.count();
    }

    @Override
    public Quotation getById(String quotationId) {
        return quotationMapper.getById(quotationId);
    }

    @Override
    public void setStateDisabled(String quotationId) {
        quotationMapper.setStateDisabled(quotationId);
    }

    @Override
    public void changeEndDate(Quotation quotation) {
        quotationMapper.changeEndDate(quotation);
    }
}
