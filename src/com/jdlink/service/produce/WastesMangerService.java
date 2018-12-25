package com.jdlink.service.produce;

import com.jdlink.domain.Page;
import com.jdlink.domain.WastesInfo;

import java.util.List;

public interface WastesMangerService {

    List<WastesInfo> list(Page page);

    int totalWastesMangerRecord();
}
