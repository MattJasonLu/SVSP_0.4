package com.jdlink.mapper;

import com.jdlink.domain.Quotation;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by matt on 2018/4/23.
 */
public interface QuotationMapper {

    void add(Quotation quotation);

    void update(Quotation quotation);

    void levelUp(Quotation quotation);

    List<Quotation> list();

    List<Quotation> list(String state);

    List<Quotation> listNotInvalid();

    List<Quotation> getByKeyword(String keyword);

    int count();

    Quotation getById(String id);

    Quotation getByQuotationId(String quotationId);

    void setStateDisabled(String id);

    void changeEndDate(Quotation quotation);

    void approval(@Param(value="advice")String advice, @Param(value="id")String id);

    void reject(@Param(value="advice")String advice, @Param(value="id")String id);
}
