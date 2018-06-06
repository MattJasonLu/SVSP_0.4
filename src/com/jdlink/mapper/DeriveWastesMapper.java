package com.jdlink.mapper;

import com.jdlink.domain.DeriveWastes;

import java.util.List;

/**
 * Created by matt on 2018/4/23.
 */
public interface DeriveWastesMapper {

    void add(DeriveWastes deriveWastes);

    void delete(String id);

    DeriveWastes getById(String id);

    List<DeriveWastes> getByQuestionnaireId(String questionnaireId);

    void update(DeriveWastes deriveWastes);

    List<DeriveWastes> list();

    int count();

}
