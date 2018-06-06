package com.jdlink.service;

import com.jdlink.domain.WasteProcess;

import java.util.List;

/**
 * Created by matt on 2018/4/23.
 */
public interface WasteProcessService {

    void add(WasteProcess wasteProcess);

    void delete(String processId);

    WasteProcess get(String processId);

    void update(WasteProcess wasteProcess);

    List<WasteProcess> getByQuestionnaireId(String questionnaireId);

    List<WasteProcess> list();

    int count();

}
