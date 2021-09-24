using FoundationPlatformPLT as externalphoto  from './external/FoundationPlatformPLT';
using PLTUserManagement as externalplt  from './external/PLTUserManagement';
using ECSkillsManagement as externalskill  from './external/ECSkillsManagement';


service SFMocks {
extend service externalplt with {
  //Mashup Entity from SuccessFactors User
    @mashup entity Users as projection on externalplt.User {
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
}
 //Mashup Entity from SuccessFactors Photo
extend service externalphoto with {
    @mashup entity Userphoto as  projection on externalphoto.Photo {
     key userId as employeeid,
    key photoType as phototype,
      photo as photo,
  };

}

@cds.autoexpose
entity sap.sfextension.refapp.Users as projection on externalplt.Users;

@cds.autoexpose 
entity sap.sfextension.refapp.Userphoto as projection on externalphoto.Userphoto;
entity SkillProfile as projection on externalskill.SkillProfile;

}


 
