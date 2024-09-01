import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { aws_lambda_nodejs, aws_apigateway, aws_iam } from "aws-cdk-lib";

export class SlideShowAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaRole = new aws_iam.Role(this, "LambdaRole", {
      assumedBy: new aws_iam.ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
    });

    lambdaRole.addToPolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
        actions: ["s3:GetObject", "s3:ListBucket"],
        resources: ["*"],
      })
    );

    const getPictures = new aws_lambda_nodejs.NodejsFunction(
      this,
      "getPictures",
      {
        runtime: Runtime.NODEJS_20_X,
        entry: "lambda/getPictures/index.ts",
        timeout: cdk.Duration.minutes(1),
        role: lambdaRole,
      }
    );

    const getAudio = new aws_lambda_nodejs.NodejsFunction(this, "getAudio", {
      runtime: Runtime.NODEJS_20_X,
      entry: "lambda/getAudio/index.ts",
      timeout: cdk.Duration.minutes(1),
      role: lambdaRole,
    });

    const slideShowApi = new aws_apigateway.RestApi(this, "SlideShowApi", {
      restApiName: "slideShowApp",
      defaultCorsPreflightOptions: {
        allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
        allowMethods: aws_apigateway.Cors.ALL_METHODS,
        allowHeaders: aws_apigateway.Cors.DEFAULT_HEADERS,
        statusCode: 200,
      },
    });

    const picturesRoutes = slideShowApi.root.addResource("pictures");
    const getPicturesIntegration = new aws_apigateway.LambdaIntegration(
      getPictures
    );
    picturesRoutes.addMethod("GET", getPicturesIntegration);

    const audioRoute = slideShowApi.root.addResource("audio");
    const getAudioIntegration = new aws_apigateway.LambdaIntegration(getAudio);
    audioRoute.addMethod("POST", getAudioIntegration);
  }
}
