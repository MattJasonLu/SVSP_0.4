package com.jdlink.service;

import com.jdlink.domain.RawWastes;

import java.util.List;

/**
 * Created by matt on 2018/4/23.
 */
public interface RawWastesService {

    void add(RawWastes rawWastes);

    void delete(String materialId);

    RawWastes get(String materialId);

    List<RawWastes> getByQuestionnaireId(String questionnaireId);

    void update(RawWastes rawWastes);

    List<RawWastes> list();

    int count();

}
