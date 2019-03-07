package com.jdlink.service.produce;

import com.jdlink.domain.Approval.ApprovalProcess;

import java.util.List;

public interface ApprovalManageService {

    List<ApprovalProcess> search(ApprovalProcess approvalProcess);

    int searchTotal(ApprovalProcess approvalProcess);
}
