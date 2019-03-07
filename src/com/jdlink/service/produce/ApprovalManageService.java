package com.jdlink.service.produce;

import com.jdlink.domain.Approval.ApprovalProcess;
import com.jdlink.domain.Produce.Organization;

import java.util.List;

public interface ApprovalManageService {

    List<ApprovalProcess> search(ApprovalProcess approvalProcess);

    int searchTotal(ApprovalProcess approvalProcess);

    List<Organization> getUrlList();
}
