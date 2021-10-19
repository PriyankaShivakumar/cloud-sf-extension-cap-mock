using FoundationPlatformPLT as externalphoto  from './external/FoundationPlatformPLT';
using PLTUserManagement as externalplt  from './external/PLTUserManagement';
using ECSkillsManagement as externalskill  from './external/ECSkillsManagement';
using { sap.sfextension.refapp } from '../../../db/schema';

service SFServiceMocks {
  
  @sap.persistance.skip 
   entity Users as projection on externalplt.User {
      key userId as employeeid ,
      defaultFullName as employeename,
      email,
      firstName,
      title,
      lastName,
      businessPhone,
      country,
      gender,
      jobLevel,
      state,
      location,
      division,
      city,
      jobTitle,
      addressLine1,
      department
  };

  entity Userphoto as projection on externalphoto.Photo {
     key userId as employeeid,
    key photoType as phototype,
      photo as photo,
  };

  entity Skill as projection on externalskill.SkillProfile {
    key externalCode as employeeid,
    ratedSkills as skills
  }

  @cds.autoexpose
  entity sap.sfextension.refapp.Users as projection on SFServiceMocks.Users;

  @cds.autoexpose 
entity sap.sfextension.refapp.Userphoto as projection on SFServiceMocks.Userphoto; 

entity Notifications as projection on  refapp.Notifications;
  
}



 
