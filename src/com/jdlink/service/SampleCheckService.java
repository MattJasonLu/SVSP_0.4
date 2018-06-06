package com.jdlink.service;

import com.jdlink.domain.SampleCheck;

import java.util.List;

/**
 * Created by matt on 2018/5/15.
 */
public interface SampleCheckService {

    void add(SampleCheck sampleCheck);

    void delete(String checkId);

    SampleCheck getById(String checkId);

    List<SampleCheck> list();
}
