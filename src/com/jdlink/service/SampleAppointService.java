package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.SampleAppoint;
import com.jdlink.domain.SampleCheck;

import java.util.List;

/**
 * Created by matt on 2018/5/14.
 */
public interface SampleAppointService {

    void add(SampleAppoint sampleAppoint);

    void delete(String appointId);

    SampleAppoint getById(String appointId);

    int countById(String appointId);

    int count();

    List<SampleAppoint> list();

    List<SampleAppoint> listPage(Page page);

    List<SampleAppoint> getByKeyword(String keyword);

    void updatePdtAndCode(SampleCheck sampleCheck);

    void update(SampleAppoint sampleAppoint);

    void setAppointed(SampleAppoint sampleAppoint);

    void setSampleTaked(SampleAppoint sampleAppoint);

    void setCanceld(SampleAppoint sampleAppoint);

    void updateApplyState(String appointId);

}
