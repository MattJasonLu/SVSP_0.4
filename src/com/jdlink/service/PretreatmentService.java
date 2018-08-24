package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Pretreatment;
import com.jdlink.domain.Wastes;

import java.util.List;

public interface PretreatmentService {
    int count();
    void add(Pretreatment pretreatment);
    List<Pretreatment> listPage(Page page);
    Pretreatment getById(String id);
    List<Pretreatment> search(Pretreatment pretreatment);
    int searchCount(Pretreatment pretreatment);
    int countById(String id);
    void invalid(String id);
    void adjust(Wastes wastes);

}
