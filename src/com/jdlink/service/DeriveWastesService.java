package com.jdlink.service;

import com.jdlink.domain.DeriveWastes;

import java.util.List;

/**
 * Created by matt on 2018/5/4.
 */
public interface DeriveWastesService {

    void add(DeriveWastes deriveWastes);

    void delete(String id);

    DeriveWastes getById(String id);

    List<DeriveWastes> getByQuestionnaireId(String questionnaireId);

    void update(DeriveWastes deriveWastes);

    List<DeriveWastes> list();

    int count();

}
