import apiClinet from "../mixins/apiClientMixin";
export default{
    methods: {
          async fetchProjectData  ({isAuthTokenAvailable})   {
            try {
                
              this.isLoading = true;
            
              
              if (!this.projectId || this.projectId == "" ) throw new Error("No project found");
                
              let url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.projectId}`;
              let headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.authToken}`,
              };
      
              if(!isAuthTokenAvailable){
                url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.projectId}?isPublic=true`;
              }

              const resp =  await apiClinet.makeCall({method: "GET", url: url, header: headers})
      

              // I CAN SAFELY ACCESS resp.data here
            
              this.projectDetails = { ...resp.data };
      
              if(!this.projectDetails.projectStatus || this.projectDetails.projectStatus === false){
                this.showStepper = false;
                this.errorMessage = "This event has ended, please contact the team to know about winners!"
                return;
              }

      
                 this.projectDetails.twitterPostFormat = encodeURIComponent(
                   this.projectDetails.twitterPostFormat
                 );
                 this.projectDetails.twitterPostTextFormat = decodeURIComponent(
                    this.projectDetails.twitterPostFormat
                 )
             
              this.projectDetails.fromDate = this.formateDate(this.projectDetails.fromDate);
              this.projectDetails.toDate = this.formateDate(this.projectDetails.toDate);
              this.projectFetched = true;
    
              this.notifySuccess("Project is fetched. ProjectName " + this.projectDetails.projectName);
              return this.projectDetails;

            } catch (e) {
         
                // console.log(e);
              this.showStepper = false;
              this.errorMessage = e
              this.notifyErr(e);
            } finally {
              this.isLoading = false;
            }
          },
    }
}