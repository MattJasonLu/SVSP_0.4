package com.jdlink.service.produce.impl;

import com.jdlink.controller.ApprovalManageController;
import com.jdlink.domain.Approval.ApprovalNode;
import com.jdlink.domain.Approval.ApprovalProcess;
import com.jdlink.domain.Produce.Organization;
import com.jdlink.mapper.produce.ApprovalManageMapper;
import com.jdlink.service.produce.ApprovalManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ApprovalManageServiceImpl implements ApprovalManageService {

    @Autowired
    ApprovalManageMapper approvalManageMapper;
    @Override
    public List<ApprovalProcess> search(ApprovalProcess approvalProcess){ return approvalManageMapper.search(approvalProcess); }

    @Override
    public int searchTotal(ApprovalProcess approvalProcess) { return approvalManageMapper.searchTotal(approvalProcess); }

    @Override

    public ApprovalProcess getApprovalProcessByOrderId(String orderId) {
        return approvalManageMapper.getApprovalProcessByOrderId(orderId);
    }

    @Override
    public ApprovalNode getNodeByIdAndRoleId(int id, String roleId) {
        return approvalManageMapper.getNodeByIdAndRoleId(id, roleId);
    }

    @Override
    public void updateApprovalById(String id, int stateId, String approvalAdvice,String userName,Date date) {
        approvalManageMapper.updateApprovalById(id, stateId, approvalAdvice,userName,date);
    }



    public List<Organization> getUrlList() {
        return approvalManageMapper.getUrlList();
    }

    @Override
    public ApprovalProcess getApprovalProcessModelById(int id) { return approvalManageMapper.getApprovalProcessModelById(id); }

    @Override
    public void deleteModelById(int id) {
        approvalManageMapper.deleteModelNotesByApprovalProcessId(id);   // 删除节点
        approvalManageMapper.deleteModelProcessByApprovalProcessId(id);   // 删除流
    }

    @Override
    public void updateModelProcessById(ApprovalProcess approvalProcess) {
        approvalManageMapper.deleteModelNotesByApprovalProcessId(approvalProcess.getId());   // 删除节点
        approvalManageMapper.updateApprovalProcessById(approvalProcess);   // 更新审批流外层数据
        if(approvalProcess.getApprovalNodeList() != null && approvalProcess.getApprovalNodeList().size() > 0) {
            for(ApprovalNode approvalNode : approvalProcess.getApprovalNodeList()) {
                 approvalManageMapper.addApprovalNode(approvalNode);   // 新增节点
            }
        }

    }

    @Override
    public void addApprovalModel(ApprovalProcess approvalProcess) {
        approvalManageMapper.addApprovalProcess(approvalProcess);
        if(approvalProcess.getApprovalNodeList() != null && approvalProcess.getApprovalNodeList().size() > 0) {
            for(ApprovalNode approvalNode : approvalProcess.getApprovalNodeList()) {
                approvalManageMapper.addApprovalNode(approvalNode);
            }
        }
    }

    @Override
    public void updateApprovalProcessModelUrlById(ApprovalProcess approvalProcess) {
        approvalManageMapper.addApprovalProcessModelUrl(approvalProcess);           // 新增当前的链接
    }


    @Override
    public ApprovalProcess getModelProcessByUrl(String url) {
        return approvalManageMapper.getModelProcessByUrl(url);
    }

    @Override
    public void publicSubmit(String orderId, String userName, String url,String roleId) {
        //首先先根据订单号找出是否存在审批流
        ApprovalProcess approvalProcess4=approvalManageMapper. getApprovalProcessFlowByOrderId(orderId);
          if(approvalProcess4!=null){
              //直接更新状态
              List<ApprovalNode> approvalNodeList=approvalProcess4.getApprovalNodeList();
                   for(int i=0;i<approvalNodeList.size();i++){
                       //首先状态都为3
                       approvalManageMapper.updateApprovalById(approvalNodeList.get(i).getId(),3,approvalNodeList.get(i).getApprovalAdvice(),approvalNodeList.get(i).getUserName(),null);
                   }
                   //找出本节点
              ApprovalNode approvalNode=approvalManageMapper.getApprovalNodeByNullApprovalPId(approvalProcess4.getId(),Integer.parseInt(roleId));
              approvalManageMapper.updateApprovalById(approvalNode.getId(),5,"",userName,new Date());
              //父节点审批中
              ApprovalNode approvalNode1=approvalManageMapper.getApprovalNodeById(approvalNode.getApprovalPId());
              approvalManageMapper.updateApprovalById(approvalNode1.getId(),2,approvalNode1.getApprovalAdvice(),approvalNode1.getUserName(),null);
          }
          else {



        //根据url找出审批流对象
        ApprovalProcess approvalProcess=approvalManageMapper.getModelProcessByUrl(url);
        //创建实际的审批流对象设置相关的信息 1订单号,2创建人
        ApprovalProcess approvalProcess1=new ApprovalProcess();
        approvalProcess1.setOrderId(orderId);
        approvalProcess1.setCreator(userName);
        approvalProcess1.setUrl(url);
           approvalManageMapper.addApprovalFlow(approvalProcess1);
        //审批流新增
        /*================================*/
        //订单明细的更新
        //获取最新的审批流对象
        ApprovalProcess approvalProcess2=approvalManageMapper.getNewestApprovalProcessByCreateTime();
         List<ApprovalNode> approvalNodeList=approvalProcess.getApprovalNodeList();
        List<ApprovalNode> approvalNodeList1=new ArrayList<>();
        for(int i=0;i<approvalNodeList.size();i++){
            ApprovalNode approvalNode=new ApprovalNode();
            approvalNode.setApprovalProcessId(approvalProcess2.getId());//绑定审批流对象
            approvalNode.setRoleId(approvalNodeList.get(i).getRoleId());//绑定角色
               if(i==0){
                   approvalNode.setUserName(userName);
               }

                if(approvalNodeList.get(i).getApprovalPId().trim().length()>0&&!approvalNodeList.get(i).getApprovalPId().trim().equals("")&&approvalNodeList.get(i).getApprovalPId().trim()!=""){
                    approvalNode.setApprovalPId(approvalProcess2.getId()+"-"+approvalNodeList.get(i).getApprovalPId());
                }

            //绑定主键
            approvalNode.setId(approvalProcess2.getId()+"-"+approvalNodeList.get(i).getId());
            approvalNodeList1.add(approvalNode);
        }

        for(int i=0;i<approvalNodeList1.size();i++){
            //跟新审批节点
            approvalManageMapper.updateApprovalNode(approvalNodeList1.get(i));
        }

        //本节点已提交
         //查询本节点
        ApprovalNode approvalNode=approvalManageMapper.getApprovalNodeByNullApprovalPId(approvalProcess2.getId(),Integer.parseInt(roleId));
        approvalManageMapper.updateApprovalById(approvalNode.getId(),5,"",userName,new Date());
        //父节点审批中
        ApprovalNode approvalNode1=approvalManageMapper.getApprovalNodeById(approvalNode.getApprovalPId());
        approvalManageMapper.updateApprovalById(approvalNode1.getId(),2,approvalNode1.getApprovalAdvice(),approvalNode1.getUserName(),null);
          }
    }

    @Override
    public void addApprovalFlow(ApprovalProcess approvalProcess) {
        approvalManageMapper.addApprovalFlow(approvalProcess);
    }

    @Override
    public ApprovalProcess getNewestApprovalProcessByCreateTime() {
        return approvalManageMapper.getNewestApprovalProcessByCreateTime();
    }

    @Override
    public void updateApprovalNode(ApprovalNode approvalNode) {
        approvalManageMapper.updateApprovalNode(approvalNode);
    }

    @Override
    public ApprovalNode getApprovalNodeByNullApprovalPId(int approvalProcessId,int roleId) {
        return approvalManageMapper.getApprovalNodeByNullApprovalPId(approvalProcessId,roleId);
    }

    @Override
    public List<ApprovalProcess> getOrderIdAndUrlByRoleId(ApprovalProcess approvalProcess) {
        return approvalManageMapper.getOrderIdAndUrlByRoleId(approvalProcess);
    }

    @Override
    public int getOrderIdAndUrlByRoleIdCount(ApprovalProcess approvalProcess) {
        return approvalManageMapper.getOrderIdAndUrlByRoleIdCount(approvalProcess);
    }

    @Override
    public ApprovalNode getApprovalNodeByOrderIdAndRoleId(String orderId, int roleId) {
        return approvalManageMapper.getApprovalNodeByOrderIdAndRoleId(orderId, roleId);
    }

    @Override
    public ApprovalNode getApprovalNodeByPNodeIdAndApprovalProcessId(int approvalP0rocessId, String approvalPId) {
        return approvalManageMapper.getApprovalNodeByPNodeIdAndApprovalProcessId(approvalP0rocessId,approvalPId);
    }

    @Override
    public ApprovalNode selectSupremeNodeByOrderId(String orderId) {
        return approvalManageMapper.selectSupremeNodeByOrderId(orderId);
    }

    @Override
    public void publicBack(String orderId, int roleId, String approvalAdvice, int radio) {
        //判断驳回的层级来做
        //1发起人，前面的节点状态改为重新审批，发起人的状态改为重新提交，当前节点变为驳回
        //2上一级 前节点变为驳回 上一级变为重新提交
        ApprovalNode approvalNode=approvalManageMapper.getApprovalNodeByOrderIdAndRoleId(orderId,roleId);
        if(radio==1){

                List<ApprovalNode> approvalNodeList=getAllChildApprovalNode(approvalNode);
               //是倒叙的，发起者是最后一个
                for(int x=0;x<approvalNodeList.size();x++){
                    if(x<approvalNodeList.size()-1){
                      //子节点更新
                        approvalManageMapper.updateApprovalById(approvalNodeList.get(x).getId(),7,approvalNodeList.get(x).getApprovalAdvice(),approvalNodeList.get(x).getUserName(),new Date());
                    }
                    else {
                        //根节点更新
                        approvalManageMapper.updateApprovalById(approvalNodeList.get(x).getId(),6,approvalNodeList.get(x).getApprovalAdvice(),approvalNodeList.get(x).getUserName(),new Date());
                    }
                }

        }
        if(radio==0){//上一级
            List<ApprovalNode> approvalNodeList=getAllChildApprovalNode(approvalNode);
            //上一级就是第一个
            approvalManageMapper.updateApprovalById(approvalNodeList.get(0).getId(),7,approvalNodeList.get(0).getApprovalAdvice(),approvalNodeList.get(0).getUserName(),new Date());
        }

        //最后更新本节点的装填为驳回0
        approvalManageMapper.updateApprovalById(approvalNode.getId(),0,approvalAdvice,approvalNode.getUserName(),new Date());

    }

    @Override
    public ApprovalNode getApprovalNodeById(String id) {
        return approvalManageMapper.getApprovalNodeById(id);
    }

    @Override
    public ApprovalProcess getApprovalProcessFlowByOrderId(String orderId) {
        return approvalManageMapper.getApprovalProcessFlowByOrderId(orderId);
    }

    /*根据当前节点获取所有的子节点*/
    public   List<ApprovalNode> getAllChildApprovalNode(ApprovalNode approvalNode){
        int approvalProcessId=approvalNode.getApprovalProcessId();//审批流主键
        List<ApprovalNode> approvalNodeList=new ArrayList<>();
//        approvalNodeList.add(approvalNode);
        ApprovalNode approvalNode1=approvalNode;
        ApprovalNode approvalNode2=null;
        while (approvalManageMapper.getApprovalNodeByPNodeIdAndApprovalProcessId(approvalProcessId,approvalNode1.getId())!=null){
            approvalNode2=approvalManageMapper.getApprovalNodeByPNodeIdAndApprovalProcessId(approvalProcessId,approvalNode1.getId());
            approvalNodeList.add(approvalNode2);
            approvalNode1=approvalNode2;
        }

        return approvalNodeList;
    }

}
