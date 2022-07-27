const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data:new SlashCommandBuilder()
	      .setName('clean_roles')
	      .setDescription('清除身分組')
        .addSubcommand(subcommand =>
          subcommand
            .setName('駕照身分組')
            .setDescription('清除駕照類身分組'))
        .addSubcommand(subcommand =>
          subcommand
            .setName('通知身分組')
            .setDescription('清除通知類身分組'))
        .addSubcommand(subcommand =>
          subcommand
            .setName('身家調查身分組')
            .setDescription('清除身家調查類身分組'))
        .addSubcommand(subcommand =>
          subcommand
            .setName('幹部候選人身分組')
            .setDescription('清除幹部候選人類身分組')),
  async execute(inter,Discord){
    var roleList = []
    switch(inter.options.getSubcommand()){
      case '駕照身分組':
        roleList = ["926262190619643925","926262352838529055"]
        break;
      case '通知身分組':
        roleList = ['926270856815071312',"926270748564291665","926270913421377556","930797726013202482"]
        break;
      case '身家調查身分組':
        roleList = ['926263379331514368', '926272265069412362', '1001401223762690088', '926272273835520110', '926272274556932116', '926272274909237270', '926272275471274046', '1001401869521915904', '1001401868775329852', '1001401867751927898', '926272371583774730', '1001401866732703774', '926272372288393247', '926272406794960906'];
        break;
      case '幹部候選人身分組':
        roleList = ['970323405817655327','972724012058824724','972724012834783242','972726345102663751','972726346830725220','972726347367579708']
        break
      default:
        roleList = undefined
        break;
    }
    if(!roleList){
      await inter.reply({content:'請選擇類別',ephemeral:true})
      return;
    }
    var removeList = roleList.filter(role=>inter.member.roles.cache.some(roles=>roles==role))
    for(var role of removeList){
      await inter.member.roles.remove(role);
    }
    await inter.reply({content:'已經移除所有身分組',ephemeral:true})
  }
}
